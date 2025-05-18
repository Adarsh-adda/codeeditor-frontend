import { useState } from "react";
import { Box, Button, Text, useToast, useBreakpointValue } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      console.log(result);

      if (result.stderr) {
        setIsError(true);
        setOutput(result.stderr.split("\n"));
      } else {
        setIsError(false);
        setOutput(result.output.split("\n"));
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      w={isMobile ? "100%" : "100%"}  // Ensure it stretches in its container
      mt={isMobile ? 4 : 0}
      flex="1"                         // Take all available width in stack
    >
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height={isMobile ? "40vh" : "75vh"}
        overflowY="auto"
        p={3}
        border="1px solid"
        borderRadius="md"
        borderColor={isError ? "red.500" : "#333"}
        bg={isError ? "#2a0000" : "#1a202c"}
        color={isError ? "red.300" : "white"}
        fontSize="sm"
        fontFamily="mono"
        w="100%"                      // Enforce full width inside this Box
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;
