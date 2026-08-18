import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { contentCategoryIds } from './lib/content-categories';

const status = z.enum(['draft', 'published']).default('draft');
const level = z.enum(['beginner', 'intermediate', 'advanced']);
const contentCategory = z.enum(contentCategoryIds);
const demonstrationKey = z.enum([
  'screen-reader/page-structure-and-links',
  'screen-reader/icons-and-svg',
  'screen-reader/language-changes',
  'screen-reader/modal-dialogs',
]);

const common = {
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  status,
  order: z.number().int().nonnegative().default(0),
  topics: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  updatedAt: z.coerce.date().optional(),
};

const learningPaths = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/learning-paths' }),
  schema: z.object({
    ...common,
    level,
    estimatedMinutes: z.number().int().positive(),
    outcomes: z.array(z.string()).min(1),
    steps: z.array(z.discriminatedUnion('type', [
      z.object({ type: z.literal('method'), entry: reference('testingMethods') }),
      z.object({ type: z.literal('exercise'), entry: reference('exercises') }),
      z.object({ type: z.literal('journey'), entry: reference('testingJourneys') }),
      z.object({
        type: z.literal('content'),
        title: z.string(),
        anchor: z.string(),
      }),
    ])).min(1),
  }),
});

const testingMethods = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testing-methods' }),
  schema: z.object({
    ...common,
    category: contentCategory,
    skillLevel: level,
    estimatedMinutes: z.number().int().positive().optional(),
    tools: z.array(z.string()).default([]),
    platforms: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).min(1),
    demonstration: demonstrationKey.optional(),
    interpretation: z.array(z.string()).default([]),
    limitations: z.array(z.string()).default([]),
    relatedMethods: z.array(reference('testingMethods')).default([]),
    relatedExercises: z.array(reference('exercises')).default([]),
  }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/exercises' }),
  schema: z.object({
    ...common,
    category: contentCategory,
    difficulty: level,
    estimatedMinutes: z.number().int().positive(),
    exerciseType: z.enum(['find-issues', 'perform-test', 'compare', 'fix-implementation']),
    fixture: z.string(),
    objectives: z.array(z.string()).min(1),
    methods: z.array(reference('testingMethods')).min(1),
    hints: z.array(z.string()).default([]),
    expectedFindings: z.number().int().nonnegative().optional(),
    solution: z.object({
      summary: z.string(),
      findings: z.array(z.object({
        title: z.string(),
        explanation: z.string(),
        method: reference('testingMethods').optional(),
      })),
    }).optional(),
  }),
});

const testingJourneys = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testing-journeys' }),
  schema: z.object({
    ...common,
    difficulty: level,
    estimatedMinutes: z.number().int().positive(),
    scenario: z.string(),
    role: z.string().optional(),
    objectives: z.array(z.string()).min(1),
    methods: z.array(reference('testingMethods')).min(2),
    learningPaths: z.array(reference('learningPaths')).default([]),
    exercises: z.array(reference('exercises')).default([]),
    stages: z.array(z.object({
      title: z.string(),
      task: z.string(),
      methods: z.array(reference('testingMethods')).default([]),
    })).min(1),
    deliverables: z.array(z.string()).default([]),
  }),
});

export const collections = {
  learningPaths,
  testingMethods,
  exercises,
  testingJourneys,
};
