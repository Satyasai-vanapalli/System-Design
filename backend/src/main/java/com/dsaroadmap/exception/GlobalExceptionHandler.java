package com.dsaroadmap.exception;

import java.time.Instant;
import java.util.*;
import org.springframework.http.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
    public record ApiError(Instant timestamp, int status, String error, String message, Map<String,String> fields) {}

    @ExceptionHandler(NotFoundException.class)
    ResponseEntity<ApiError> notFound(NotFoundException ex) { return error(HttpStatus.NOT_FOUND, ex.getMessage(), null); }
    @ExceptionHandler(ConflictException.class)
    ResponseEntity<ApiError> conflict(ConflictException ex) { return error(HttpStatus.CONFLICT, ex.getMessage(), null); }
    @ExceptionHandler(BadCredentialsException.class)
    ResponseEntity<ApiError> unauthorized(BadCredentialsException ex) { return error(HttpStatus.UNAUTHORIZED, "Invalid email or password", null); }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex) {
        Map<String,String> fields = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> fields.putIfAbsent(e.getField(), e.getDefaultMessage()));
        return error(HttpStatus.BAD_REQUEST, "Please correct the highlighted fields", fields);
    }
    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiError> generic(Exception ex) { return error(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", null); }

    private ResponseEntity<ApiError> error(HttpStatus status, String message, Map<String,String> fields) {
        return ResponseEntity.status(status).body(new ApiError(Instant.now(), status.value(), status.getReasonPhrase(), message, fields));
    }
}
