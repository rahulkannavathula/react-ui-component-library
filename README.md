# React UI Component Library

> Production-ready, fully typed reusable React component library — built for scalable enterprise applications.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=flat-square&logo=typescript)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?style=flat-square&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Overview

A **production-ready component library** built to be consumed across multiple product modules. Each component is fully typed, accessible (WCAG 2.1 AA), and themeable. Designed to reduce UI development time across large engineering teams.

## Components

| Component | Description |
|-----------|-------------|
| `<Button>` | Variants: primary, secondary, danger, ghost. Sizes: sm, md, lg |
| `<Modal>` | Accessible modal with focus trap, backdrop click, Escape key |
| `<Table>` | Sortable, paginated data table with generic TypeScript support |
| `<Badge>` | Status/label badge with 6 color variants |
| `<Input>` | Controlled text input with validation states and helper text |

## Features

- **TypeScript-first** — strict generics on all components
- **CSS Modules** — zero global style leakage
- **Accessibility** — ARIA roles, keyboard navigation, focus management
- **Tree-shakeable** — import only what you use
- **Zero dependencies** — only peer deps on React & ReactDOM

## Installation

```bash
npm install @rahulk/react-ui-component-library
```

## Usage

```tsx
import { Button, Modal, Table, Badge, Input } from '@rahulk/react-ui-component-library';

// Button
<Button variant="primary" size="md" onClick={handleClick}>
  Submit Invoice
</Button>

// Badge
<Badge variant="success">Approved</Badge>

// Table
<Table
  data={invoices}
  columns={[
    { key: 'invoiceNumber', label: 'Invoice #', sortable: true },
    { key: 'vendor', label: 'Vendor', sortable: true },
    { key: 'amount', label: 'Amount' },
  ]}
/>
```

## Project Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   ├── Modal/
│   │   ├── Modal.tsx
│   │   └── Modal.module.css
│   ├── Table/
│   │   ├── Table.tsx
│   │   └── Table.module.css
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   └── Badge.module.css
│   └── Input/
│       ├── Input.tsx
│       └── Input.module.css
└── index.ts
```

## License

MIT © [Rahul Karnavathula](https://github.com/rahulkannavathula)
