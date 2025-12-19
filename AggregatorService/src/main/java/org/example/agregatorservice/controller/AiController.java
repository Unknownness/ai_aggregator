package org.example.agregatorservice.controller;

import lombok.RequiredArgsConstructor;
import org.example.agregatorservice.dto.AiResponse;
import org.example.agregatorservice.dto.PromptRequest;
import org.example.agregatorservice.service.AiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiController {
    private final AiService aiService;

    @PostMapping
    public ResponseEntity<AiResponse> sendPrompt(@RequestBody PromptRequest promptRequest) {
        return ResponseEntity.ok(aiService.sendPrompt(promptRequest));
    }

    @GetMapping("/ping")
    public ResponseEntity<Void> ping() {
        return ResponseEntity.noContent().build();
    }
}
