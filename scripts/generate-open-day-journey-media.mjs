import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const outputDirectory = resolve('public/media');
const videoPath = join(outputDirectory, 'open-day-travel-information.webm');
const captionsPath = join(outputDirectory, 'open-day-travel-information.en.vtt');
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'open-day-journey-media-'));
const segments = [
  'Travel to Riverside Community Centre on tram 7.',
  'Leave the tram at Riverside Square and follow signs to the garden entrance.',
  'The garden entrance has step-free access and an automatic door.',
  'Ask at the welcome desk if you would like help finding an activity.',
];
const captionSegments = [
  'Travel to Riverside Community Centre on tram 4.',
  'Leave the tram at Riverside Square and follow signs to the garden entrance.',
  'The garden entrance has step-free access and an automatic door.',
  'Ask at the welcome desk if you would like help finding an activity.',
];
const toTimestamp = (seconds) => {
  const milliseconds = Math.round(seconds * 1000);
  const hours = Math.floor(milliseconds / 3_600_000);
  const minutes = Math.floor((milliseconds % 3_600_000) / 60_000);
  const remainder = (milliseconds % 60_000) / 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${remainder.toFixed(3).padStart(6, '0')}`;
};

try {
  const audio = segments.map((segment, index) => {
    const aiffPath = join(temporaryDirectory, `segment-${index}.aiff`);
    const wavePath = join(temporaryDirectory, `segment-${index}.wav`);
    execFileSync('say', ['-v', 'Samantha', '-r', '132', '-o', aiffPath, segment]);
    execFileSync('afconvert', ['-f', 'WAVE', '-d', 'LEI16', aiffPath, wavePath]);
    return readFileSync(wavePath).toString('base64');
  });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const video = await page.evaluate(async ({ audio }) => {
    const decode = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0)).buffer;
    const context = new AudioContext();
    const buffers = await Promise.all(audio.map((value) => context.decodeAudioData(decode(value))));
    const starts = [];
    let cursor = 0.8;
    buffers.forEach((buffer) => {
      starts.push(cursor);
      cursor += buffer.duration + 0.4;
    });
    const duration = cursor + 0.5;
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const drawing = canvas.getContext('2d');
    const draw = (time) => {
      drawing.fillStyle = '#f5f0ff';
      drawing.fillRect(0, 0, 960, 540);
      drawing.fillStyle = '#15074d';
      drawing.fillRect(0, 0, 960, 96);
      drawing.fillStyle = '#fff';
      drawing.font = '700 36px Arial';
      drawing.fillText('Riverside Community Centre', 54, 63);
      drawing.fillStyle = '#24175c';
      drawing.font = '700 54px Arial';
      drawing.fillText('Travel to the open day', 54, 180);
      drawing.fillStyle = '#38325c';
      drawing.font = '32px Arial';
      drawing.fillText(time < starts[1] ? 'Tram 7 · Riverside Square' : 'Garden entrance · Step-free route', 54, 250);
      drawing.fillStyle = '#fff';
      drawing.strokeStyle = '#7147b8';
      drawing.lineWidth = 5;
      drawing.fillRect(54, 305, 852, 150);
      drawing.strokeRect(54, 305, 852, 150);
      drawing.fillStyle = '#24175c';
      drawing.font = '700 31px Arial';
      drawing.fillText('Shuttle cancelled after 16:00', 88, 365);
      drawing.fillStyle = '#38325c';
      drawing.font = '28px Arial';
      drawing.fillText('Use the garden entrance for step-free access', 88, 420);
    };
    const destination = context.createMediaStreamDestination();
    buffers.forEach((buffer, index) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(destination);
      source.start(context.currentTime + starts[index]);
    });
    draw(0);
    const canvasStream = canvas.captureStream(15);
    const stream = new MediaStream([...canvasStream.getVideoTracks(), ...destination.stream.getAudioTracks()]);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus', videoBitsPerSecond: 700_000 });
    const chunks = [];
    recorder.addEventListener('dataavailable', (event) => { if (event.data.size) chunks.push(event.data); });
    const finished = new Promise((resolve) => recorder.addEventListener('stop', resolve, { once: true }));
    const startedAt = performance.now();
    const paint = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      draw(elapsed);
      if (elapsed < duration) requestAnimationFrame(paint);
    };
    recorder.start(500);
    requestAnimationFrame(paint);
    await new Promise((resolve) => setTimeout(resolve, duration * 1000));
    recorder.stop();
    await finished;
    await context.close();
    const bytes = new Uint8Array(await new Blob(chunks, { type: 'video/webm' }).arrayBuffer());
    let binary = '';
    for (let offset = 0; offset < bytes.length; offset += 0x8000) binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    return {
      encodedVideo: btoa(binary),
      starts,
      durations: buffers.map((buffer) => buffer.duration),
    };
  }, { audio });
  await browser.close();
  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(videoPath, Buffer.from(video.encodedVideo, 'base64'));
  const cues = captionSegments.map((caption, index) => {
    const start = toTimestamp(video.starts[index]);
    const end = toTimestamp(video.starts[index] + video.durations[index]);
    return `${start} --> ${end}\n${caption}`;
  });
  writeFileSync(captionsPath, ['WEBVTT', '', ...cues.flatMap((cue) => [cue, ''])].join('\n'));
  process.stdout.write(`Created ${videoPath} and ${captionsPath}\n`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
