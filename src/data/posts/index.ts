import { BlogArticle } from '../blogArticles';
import { postScienceOfMicroBreaks } from './science-of-5-minute-micro-breaks';
import { postDigitalDecompressionVsDoomscrolling } from './digital-decompression-vs-doomscrolling';
import { postErgonomicGamingWristRoutines } from './ergonomic-gaming-wrist-relaxation-routines';
import { postPsychologyOfAsmrSound } from './psychology-of-asmr-popping-cracking-sounds';
import { postFromRageRoomToZenPond } from './from-rage-room-to-zen-pond-decision-protocol';
import { postSensoryGroundingForAdhd } from './sensory-grounding-for-adhd-and-neurodivergent-focus';
import { postVirtualDestructionCatharsis } from './the-psychology-of-virtual-destruction-demolition';

export {
  postScienceOfMicroBreaks,
  postDigitalDecompressionVsDoomscrolling,
  postErgonomicGamingWristRoutines,
  postPsychologyOfAsmrSound,
  postFromRageRoomToZenPond,
  postSensoryGroundingForAdhd,
  postVirtualDestructionCatharsis,
};

export const ALL_POSTS: BlogArticle[] = [
  postScienceOfMicroBreaks,
  postDigitalDecompressionVsDoomscrolling,
  postErgonomicGamingWristRoutines,
  postPsychologyOfAsmrSound,
  postFromRageRoomToZenPond,
  postSensoryGroundingForAdhd,
  postVirtualDestructionCatharsis,
];

export function getPostBySlug(slug: string): BlogArticle | undefined {
  return ALL_POSTS.find((p) => p.slug === slug || p.id === slug);
}

export function getAllPostSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
}
