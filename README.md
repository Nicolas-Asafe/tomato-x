# Tomato-X - lang: english

## Philosophy

Tomato-X is an experimental Node.js backend framework focused on **configuration over code**.

Instead of manually writing routes, controllers, and repetitive glue code, you **describe your API using JSON files and folder structure**, and the framework does the rest.

The goal is not to replace existing frameworks, but to explore a different way of building backends: more declarative, more modular, and more reusable.

---

## How it works

Tomato-X is built around three core ideas:

* **Core**: reads folders and JSON files and turns them into a running API
* **Distros**: pluggable modules that add behavior and features
* **Structure-driven API**: the filesystem defines what exists

Your project becomes a composition of configurations and distros, not scattered logic.

---

## Core (JSONs + folders)

The Core scans your project structure and interprets it as an API definition.

A simple folder can describe:

* resources
* entities
* DTOs
* exposed operations

No explicit routes. No handwritten controllers.

---

## Distros

Distros are reusable modules that extend Tomato-X.

A distro can:

* add database support
* generate controllers
* define routing rules
* introduce custom data types

Everything that is common across projects can become a distro.

This makes features portable and reusable instead of tightly coupled to one codebase.

---

## Reusability first

In Tomato-X, **almost everything can be reused**:

* data types
* database logic
* route patterns
* common behaviors

Projects are not rewritten. They are assembled.

---

## When it makes sense

* small to medium projects
* devs tired of boilerplate
* config-driven systems
* architectural experiments

---

## When it does not

* highly custom request flows
* very specific per-route logic
* cases that require full manual control

---

## Status

This project is **experimental** and evolving.

Ideas, feedback, and contributions are welcome.

If the concept resonates with you, a star helps ⭐
