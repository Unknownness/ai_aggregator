plugins {
    java
    id("org.springframework.boot") version "4.0.0"
    id("io.spring.dependency-management") version "1.1.7"
}

group = "org.example"
version = "0.0.1"
description = "AggregatorService"

val lombokVersion = "1.6.3"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    implementation("org.mapstruct:mapstruct:$lombokVersion")
    annotationProcessor("org.mapstruct:mapstruct-processor:$lombokVersion")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
