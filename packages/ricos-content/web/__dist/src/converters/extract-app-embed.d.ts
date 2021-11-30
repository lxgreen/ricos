import { RichContent } from 'ricos-schema';
export declare const extractAppEmbedData: (content: RichContent) => ({
    type: import("ricos-schema").AppEmbedData_AppType;
    id: string | undefined;
    url: string | undefined;
    eventData: import("ricos-schema").AppEmbedData_EventData | undefined;
    bookingData: import("ricos-schema").AppEmbedData_BookingData | undefined;
} | undefined)[];
//# sourceMappingURL=extract-app-embed.d.ts.map