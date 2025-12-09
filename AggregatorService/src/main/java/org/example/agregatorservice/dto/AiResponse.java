package org.example.agregatorservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class AiResponse {
    private String id;
    private String model;
    private List<Choice> choices;

    @Getter
    @Setter
    public static class Choice {
        private Integer index;
        private Message message;

        @Getter
        @Setter
        public static class Message {
            private String role;
            private String content;
            @JsonProperty("reasoning_content")
            private String reasoningContent;
        }
    }
}
