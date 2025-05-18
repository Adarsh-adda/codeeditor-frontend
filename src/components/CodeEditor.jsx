import { useRef, useState } from "react";
import { Box, Stack, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const isMobile = useBreakpointValue({ base: true, md: false });

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box w="100%" p={isMobile ? 2 : 4}>
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={4}
        w="100%"
        align="stretch"
      >
        <Box w="100%">
          <Box textAlign="right" mb={2}>
            <LanguageSelector language={language} onSelect={onSelect} />
          </Box>
          <Editor
          
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,

            }}
            height={isMobile ? "40vh" : "75vh"}
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Box w="100%">
          <Output editorRef={editorRef} language={language} />
        </Box>
      </Stack>
    </Box>
  );
};

export default CodeEditor;
