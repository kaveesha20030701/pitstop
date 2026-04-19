public type GeminiConfig record {|
    string apiKey;
|};

public type GeminiPart record {|
    string text;
|};

public type GeminiContent record {|
    GeminiPart[] parts;
    string? role = ();
|};

public type GeminiCandidate record {|
    GeminiContent content;
    string? finishReason = ();
    int? index = ();
|};

public type GeminiRequest record {|
    record {|
        record {|
            string text;
        |} [] parts;
    |} [] contents;
|};

public type GeminiResponse record {
    GeminiCandidate[] candidates;
    record {
        int promptTokenCount?;
        int candidatesTokenCount?;
        int totalTokenCount?;
    } usageMetadata?;
};