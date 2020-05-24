import { float } from "aws-sdk/clients/lightsail";

export class EventData {
    event_id: number | undefined;
    event_name: String | undefined;
    event_search_score: float | undefined;
}