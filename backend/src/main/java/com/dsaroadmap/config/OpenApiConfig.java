package com.dsaroadmap.config;
import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.components.*;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.*;
import org.springframework.context.annotation.*;
@Configuration public class OpenApiConfig {
    @Bean OpenAPI openAPI() { return new OpenAPI().info(new Info().title("DSA Roadmap API").version("1.0").description("Learning catalog, progress, authentication and administration APIs"))
        .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
        .components(new Components().addSecuritySchemes("bearerAuth", new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT"))); }
}

