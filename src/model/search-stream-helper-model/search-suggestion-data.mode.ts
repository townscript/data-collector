import { float } from "aws-sdk/clients/lightsail";

export class SearchSuggestionData {
    suggestion: String | undefined;
    score: float | undefined;
}