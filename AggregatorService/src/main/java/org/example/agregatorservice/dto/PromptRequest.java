package org.example.agregatorservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class PromptRequest {
    private String model;
    private List<Map<String, String>> messages;
    private Float temperature;
    @JsonProperty("top_p")
    private Float topP;
    @JsonProperty("frequency_penalty")
    private Float frequencyPenalty;
    @JsonProperty("presence_penalty")
    private Float presencePenalty;
    @JsonProperty("max_tokens")
    private Integer maxTokens;
    private Boolean stream;
}
