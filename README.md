# Client table with Advanced Multi-level-sorting

**Overview**

- This is a client management table with advanced multi-level sorting.
- **Open sorting panel**
- **A simple sort:** Add "Client Name (A-Z)" and apply. See the table update.
- **A multi-sort:** Add "Client Name (A-Z)" then "Created At (Newest to Oldest)". Now, clients with the same name will be further sorted by when they were created. See the table update.
- **Drag-and-drop reordering of sort criteria** in the panel and see how it changes the table.
- **Sort persistence:** Refresh the page, see the sort order is persist because of localStorage.

**How the Sorting Logic Works**

- The core sorting logic is quite straightforward. When you apply multiple sort criteria...
- applySorting Function -
    - 1. We take the **first** sort rule (e.g., Client Name).
    - 2. If two clients are different by this rule, their order is decided. We stop.
    - 3. If they are the **same** by the first rule (e.g., same name), we then look at the **second** sort rule (e.g., Created At) to decide their order.
    - 4. This continues for all applied sort rules, in the order you set them.
- This means higher priority sorts always take precedence, and lower priority sorts only break ties.

**Libraries & Tools Used**

- Next.js App Router
- Tailwind CSS
- Typescript - for type-safety
- Shadcn/UI - for pre-built components
- dnd-kit - for drag and drop functionalities
- Luicde-react - for icons