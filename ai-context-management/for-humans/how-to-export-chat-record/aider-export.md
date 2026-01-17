<!-- SYSTEM FILE - Do not modify. Reference guide for exporting chats. -->

# Exporting Chats from Aider

## Method 1: Aider's Built-in History
Aider automatically saves chat history:
1. Check your project directory for `.aider.chat.history.md` file
2. Aider logs all conversations there by default
3. Copy relevant sections to `past-chat-record/`
4. Or move the entire history file periodically

## Method 2: Terminal/Shell History
Since Aider runs in terminal:
1. Scroll through your terminal to see the conversation
2. Select and copy relevant sections
3. Paste into a file in `past-chat-record/`

## Method 3: Session Logs
Aider may create session logs:
1. Look for log files in `.aider/` directory
2. Check command-line options for log output locations
3. Use `aider --help` to see logging options

## Tips
- Aider is terminal-based and typically maintains its own history
- The `.aider.chat.history.md` file is your primary source
- Consider git-committing the history file if you want version control
- Use `--no-auto-commits` flag if you want more manual control

