
### **Goal Overview**:
1. **Create and save rich text** using Draft.js and save the content to Firestore as a rich-text format (using `convertToRaw`).
2. **Retrieve and display** the rich text as HTML on a different page (using `convertFromRaw` and converting to HTML).
3. **Enable editing** by loading the content into the Draft.js editor and allowing the user to edit and save it back to Firestore.

### **Steps**:
1. **Save Rich Text to Firestore**:
   - Use the Draft.js editor to create content.
   - Convert the content to a Firestore-friendly format using `convertToRaw` and store it in Firestore.

2. **Retrieve and Display as HTML**:
   - Fetch the stored rich text from Firestore.
   - Convert the rich text to HTML using a utility like `draft-js-export-html` to render the raw content as HTML.
   - Provide an "Edit" button to load the content into the Draft.js editor for editing.

3. **Edit the Rich Text**:
   - On clicking the "Edit" button, load the rich text back into the editor for editing.
   - After editing, save the updated content back to Firestore.

---

### **Complete Code Example**:

#### **1. Save Rich Text to Firestore (CreatePage.js)**

```jsx
import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { db } from './firebase'; // Firebase setup
import { collection, doc, setDoc } from 'firebase/firestore';

function CreatePage() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const saveContent = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    try {
      const docRef = doc(collection(db, 'richTextContent'), 'myDocument'); // Save with a specific document ID
      await setDoc(docRef, { content: rawContent });
      console.log('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content: ', error);
    }
  };

  return (
    <div>
      <h3>Create Rich Text</h3>
      <Editor editorState={editorState} onChange={setEditorState} />
      <button onClick={saveContent}>Save Content</button>
    </div>
  );
}

export default CreatePage;
```

#### **2. Display and Edit Rich Text (DisplayPage.js)**

```jsx
import React, { useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { db } from './firebase'; // Firebase setup
import { doc, getDoc } from 'firebase/firestore';
import { stateToHTML } from 'draft-js-export-html'; // Converts Draft.js content to HTML

function DisplayPage() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [contentHtml, setContentHtml] = useState(''); // Store converted HTML
  const [isEditing, setIsEditing] = useState(false);

  // Load content from Firestore
  useEffect(() => {
    const loadContent = async () => {
      const docRef = doc(db, 'richTextContent', 'myDocument'); // Fetch the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const rawContent = docSnap.data().content;
        const contentState = convertFromRaw(rawContent);
        setEditorState(EditorState.createWithContent(contentState));

        // Convert content state to HTML for display
        const html = stateToHTML(contentState);
        setContentHtml(html);
      } else {
        console.log('No such document!');
      }
    };

    loadContent();
  }, []);

  const handleEdit = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const saveEditedContent = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    try {
      const docRef = doc(db, 'richTextContent', 'myDocument');
      await setDoc(docRef, { content: rawContent });
      console.log('Content updated successfully!');
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error('Error saving edited content: ', error);
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <h3>View Rich Text Content</h3>
          {/* Display the HTML */}
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          <button onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <div>
          <h3>Edit Rich Text</h3>
          <Editor editorState={editorState} onChange={setEditorState} />
          <button onClick={saveEditedContent}>Save Changes</button>
        </div>
      )}
    </div>
  );
}

export default DisplayPage;
```

---

### **Explanation**:

#### **1. Create and Save Rich Text**:
- The user writes text in the Draft.js editor.
- On clicking "Save Content", the text is converted to a raw format using `convertToRaw` and saved to Firestore.
- We assume that a Firestore document called `myDocument` under the `richTextContent` collection stores the content.

#### **2. Display and Edit Rich Text**:
- On this page, the rich text is fetched from Firestore.
- The raw Draft.js content is converted to an HTML string using `stateToHTML` from the `draft-js-export-html` package to display the rich text.
- An "Edit" button is provided to allow users to switch to an editable mode.
- When editing, the Draft.js editor is loaded with the existing content, and after editing, the updated content is saved back to Firestore using `convertToRaw`.

### **Summary**:
- **CreatePage.js**: Allows users to write and save rich text using Draft.js and Firestore.
- **DisplayPage.js**: Displays the rich text as HTML, provides an "Edit" button, and allows the user to edit the content using the Draft.js editor.

This setup provides you with a fully functioning rich text editor with Firestore integration, where users can write, view, and edit their rich text content.
