import { z } from 'zod';
export declare const visualizerSkill: {
    name: string;
    description: string;
    systemPrompt: string;
    parameters: z.ZodObject<{
        bpmn_data: z.ZodAny;
        project_root: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        project_root: string;
        bpmn_data?: any;
    }, {
        project_root: string;
        bpmn_data?: any;
    }>;
    execute: (params: any) => Promise<{
        status: string;
        file_path: string;
        details: string;
    }>;
};
