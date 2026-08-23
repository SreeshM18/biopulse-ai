# Contributing to BioPulse AI • NOVA Ecosystem

Thank you for your interest in contributing to **BioPulse AI**! We welcome clinical, computational biology, and software engineering contributions.

## Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/clinical-module`
3. Install dependencies: `npm install`
4. Start local development server: `npm run dev`
5. Ensure typecheck and production build pass: `npm run build`
6. Commit changes: `git commit -m 'feat: add new clinical capability'`
7. Push to the branch: `git push origin feature/clinical-module`
8. Open a Pull Request

## Code Quality Standards

- Maintain strict TypeScript types (avoid `any` where possible).
- Adhere to HL7 FHIR, ICD-10, and LOINC medical data standards.
- Test in-silico and telemetry streams for responsiveness.
