import { segmentsdb } from '../index.js';

export enum TimeExtensionMode {
    EXTEND,
    MATHEMATICAL,
    CUTOFF
}

export interface SegmentI {
    id: string;
    type: number;
    title: string;
    timeAllocation: number;
    timeExtension: TimeExtensionMode;
    timeExtensionDifference: number;
    limits: string[]; // Make a custom type?
    pointsAvailable: number;
    notes: string;
    completion: false | number;
}

export function getSegment(id: string) {
    return segmentsdb.get(id.toString()) as SegmentI;
}

export function setSegment(segment: SegmentI) {
    segmentsdb.set(segment.id.toString(), segment);
    return getSegment(segment.id);
}

export function getNextSegmentId() {
    return '0';
}
