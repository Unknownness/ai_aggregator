package org.example.agregatorservice.service;

import lombok.RequiredArgsConstructor;
import org.example.agregatorservice.dto.AiResponse;
import org.example.agregatorservice.dto.PromptRequest;
import org.example.agregatorservice.entity.Prompt;
import org.example.agregatorservice.exception.NvidiaException;
import org.example.agregatorservice.mapper.PromptMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.net.URI;
import java.net.URISyntaxException;

@Service
@RequiredArgsConstructor
public class AiService {
    @Value("${NVIDIA_URL}")
    private String url;
    @Value("${API_KEY}")
    private String apiKey;

    private final RestClient restClient = RestClient.builder().build();
    private final PromptMapper promptMapper;

    public AiResponse sendPrompt(PromptRequest promptRequest)  {
        Prompt prompt = promptMapper.toEntity(promptRequest);
        try {
            return restClient.post()
                    .uri(new URI(url))
                    .body(prompt)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .header(HttpHeaders.CONTENT_TYPE, "application/json")
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .onStatus(HttpStatusCode::isError, (req, res) -> {
                        throw new NvidiaException(res.getBody().toString());
                    })
                    .body(AiResponse.class);
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid URL: " + url);
        }
    }
}
