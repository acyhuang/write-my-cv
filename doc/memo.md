# write-my-cv Structure Memo

## Overview
write-my-cv is designed to assist users in creating customized cover letters by leveraging their resume, job descriptions, and AI-generated content. The app consists of two main components: the ContextContainer and the CanvasContainer.

## ContextContainer
The ContextContainer is responsible for gathering and managing the context required to generate the cover letter. It includes:

1. Resume Upload: A button allowing users to upload their resume as a PDF. The uploaded resume will be parsed and stored as a string for further processing.

2. Job Description Input: A text area where users can paste the job description. This input will also be stored as a string.

3. Chat Interface: A container for interacting with an LLM (Language Model). It includes:
   - Message history storage
   - Input field for user messages
   - LLM integration for generating cover letter body content

The LLM will be prompted with a structured input containing the resume, job description, current cover letter content, and user instructions. The output will be in JSON format, containing a message object and a cvBody object.

## CanvasContainer
The CanvasContainer is where the cover letter is composed and displayed. It consists of:

1. Header: A text area for custom header content. This is directly editable by the user.
2. Body: A display area for the AI-generated cover letter body.
3. Footer: A text area for custom footer content. This is directly editable by the user.

## State Management
Given the relatively simple structure of the app and the limited interactions between components, we'll use React's built-in state management capabilities:

1. Local State: Use `useState` hooks for component-specific state (e.g., form inputs, temporary data).
2. Lifting State Up: For shared state between sibling components, we'll lift the state to their nearest common ancestor.
3. Context API: For any data that needs to be accessed by many components at different nesting levels, we'll use React's Context API. This will be minimal and primarily used for the resume and job description data.

This approach allows for efficient state management without the overhead of additional libraries, making the app simpler to develop and maintain.

## Technology Stack
- Frontend: React with TypeScript
- AI Integration: Claude API using TypeScript SDK

This structure allows for a seamless workflow where users can provide context, interact with the AI to generate content, and customize their cover letter all within a single interface, while maintaining a simple and efficient state management approach.