import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const outputDirectory = resolve('public/media');
const videoPath = join(outputDirectory, 'community-centre-open-day.webm');
const captionsPath = join(outputDirectory, 'community-centre-open-day.en.vtt');
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'community-announcement-media-'));

const segments = [
  "Welcome to Riverside Community Centre's open day this Saturday.",
  'Doors open at ten in the morning.',
  'Meet local groups, try short workshops, and enjoy lunch in the garden.',
  'Workshops are free, and you do not need to book.',
  'This is Alex from the community team.',
  'Visit the welcome desk if you need help during the day.',
  'Take your time and enjoy everything the open day has to offer.',
  'We look forward to seeing you.',
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
  const result = await page.evaluate(async ({ audio }) => {
    const decode = (value) => Uint8Array.from(atob(value), (character) => character.charCodeAt(0)).buffer;
    const context = new AudioContext();
    const buffers = await Promise.all(audio.map((value) => context.decodeAudioData(decode(value))));
    const gaps = [0.45, 0.45, 0.45, 0.45, 0.8, 3, 0.45, 0.4];
    const starts = [];
    let cursor = 0.8;
    for (let index = 0; index < buffers.length; index += 1) {
      starts.push(cursor);
      cursor += buffers[index].duration + gaps[index];
    }
    const duration = cursor + 0.5;

    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 540;
    const drawing = canvas.getContext('2d');
    const draw = (time) => {
      drawing.fillStyle = '#f4f1ff';
      drawing.fillRect(0, 0, canvas.width, canvas.height);
      drawing.fillStyle = '#15074d';
      drawing.fillRect(0, 0, canvas.width, 92);
      drawing.fillStyle = '#ffffff';
      drawing.font = '700 34px Arial';
      drawing.fillText('Riverside Community Centre', 54, 58);
      drawing.fillStyle = '#24175c';
      drawing.font = '700 54px Arial';
      drawing.fillText('Open day · Saturday', 54, 180);
      drawing.font = '32px Arial';
      drawing.fillStyle = '#38325c';
      drawing.fillText(time < starts[3] ? 'Meet neighbours and try free workshops' : 'Everyone is welcome', 54, 242);
      drawing.fillStyle = '#ffffff';
      drawing.strokeStyle = '#7147b8';
      drawing.lineWidth = 5;
      drawing.fillRect(54, 300, 852, 164);
      drawing.strokeRect(54, 300, 852, 164);
      drawing.fillStyle = '#24175c';
      drawing.font = '700 31px Arial';
      drawing.fillText('Quiet hour: 9:00–10:00', 88, 361);
      drawing.font = '28px Arial';
      drawing.fillText('Step-free entrance beside the garden gate', 88, 419);
    };

    const destination = context.createMediaStreamDestination();
    buffers.forEach((buffer, index) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(destination);
      source.start(context.currentTime + starts[index]);
    });
    const bell = context.createOscillator();
    const bellGain = context.createGain();
    bell.frequency.value = 880;
    bellGain.gain.setValueAtTime(0, context.currentTime + starts[4] - 0.45);
    bellGain.gain.linearRampToValueAtTime(0.08, context.currentTime + starts[4] - 0.4);
    bellGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + starts[4] - 0.05);
    bell.connect(bellGain).connect(destination);
    bell.start(context.currentTime + starts[4] - 0.45);
    bell.stop(context.currentTime + starts[4]);

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
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return {
      video: btoa(binary),
      starts,
      durations: buffers.map((buffer) => buffer.duration),
      duration,
    };
  }, { audio });
  await browser.close();

  const cue = (index, text, offset = 0) => `${toTimestamp(result.starts[index] + offset)} --> ${toTimestamp(result.starts[index] + result.durations[index] + offset)}\n${text}`;
  const captions = [
    'WEBVTT',
    '',
    cue(0, "Welcome to Riverside Community Centre's open day this Saturday."),
    '',
    cue(1, 'Doors open at ten in the morning.'),
    '',
    cue(2, 'Meet local groups, try short workshops, and enjoy lunch in the garden.'),
    '',
    cue(4, 'This is Alex from the community team.'),
    '',
    cue(5, 'Visit the welcome desk if you need help during the day.', 2),
    '',
    cue(6, 'Take your time and enjoy everything the open day has to offer.'),
    '',
    cue(7, 'We look forward to seeing you.'),
    '',
  ].join('\n');

  mkdirSync(outputDirectory, { recursive: true });
  writeFileSync(videoPath, Buffer.from(result.video, 'base64'));
  writeFileSync(captionsPath, captions);
  process.stdout.write(`Created ${videoPath} (${Math.round(result.duration * 10) / 10} seconds) and ${captionsPath}\n`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
