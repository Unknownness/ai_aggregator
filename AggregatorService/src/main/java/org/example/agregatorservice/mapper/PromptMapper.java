package org.example.agregatorservice.mapper;

import org.example.agregatorservice.dto.PromptRequest;
import org.example.agregatorservice.entity.Prompt;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PromptMapper {

    Prompt toEntity(PromptRequest promptRequest);
}
