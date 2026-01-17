<!-- SYSTEM FILE - Do not modify. Procedures for handling stale or context-losing chats. -->

# AI Agent Stale Chat Procedures

You're here because this chat seems to be losing context or going stale. Let's figure out the best path forward.

---

## Step 1: Assess the Situation

**Ask the user:** Would you like me to:
- **A) Refresh & Continue** - Re-read context files and continue this chat
- **B) Start Fresh** - End this chat and prepare for a new one

---

## Option A: Refresh & Continue

If the user wants to refresh and continue:

1. **Re-read the essentials:**
   - `project-setup/agent-operating-rules.md` - Remember your operating principles
   - `current-work/current-work-focus.md` - Understand the current focus
   - `current-work/current-context-for-new-chat.md` - Get up to speed on current state

2. **Optional:** If you've forgotten the system structure, quickly skim `ai-agent-orientation-start-here.md`

3. **Confirm:** Let the user know you're re-oriented and ready to continue

---

## Option B: Start Fresh

If the user wants to start a new chat, help them transition properly:

### Step 1: Preserve This Chat's History

**Ask the user:** Can you export this chat to `past-chat-record/` using the export guides in `for-humans/how-to-export-chat-record/`, or would you like me to create a detailed summary?

**If they'll export it themselves:**
- Great! Remind them to save it with today's date (e.g., `2025-10-12-description.md`)
- Skip to Step 2

**If they want you to create a summary:**
- Create a **very detailed summary** of this chat session including:
  - What was discussed and decided
  - Code written or modified (file names, key changes)
  - Problems solved or encountered
  - Outstanding issues or next steps
  - Any architectural decisions made
- Save this to `past-chat-record/YYYY-MM-DD-brief-description.md`

### Step 2: Update Current Context

**Always do this** (whether they export or you summarize):

Update `current-work/current-context-for-new-chat.md` with:
- What changed in this session
- Current state (what's working, what's broken)
- Any new active issues
- What should be tackled next

### Step 3: Prepare for Transition

Let the user know:
- Context has been saved
- They should start a new chat
- In the new chat, paste the contents of `for-humans/paste-this-into-new-ai-chats.txt`

---

## Notes

- **Don't skip the context update** - This is crucial for the next chat to have continuity
- **Be thorough in summaries** - Future AI agents (and the user) will rely on this
- **Date everything** - Use YYYY-MM-DD format for consistency

