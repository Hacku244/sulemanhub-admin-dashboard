import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { motion, AnimatePresence } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

// FAQ Data
const faqData = [
  {
    question: "How can I create an account?",
    answer:
      "To create an account, click the Sign Up button on the top right and fill out the form with your details.",
    category: "Account",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page and follow the instructions to reset your password.",
    category: "Account",
  },
  {
    question: "How do I create a new project?",
    answer:
      "Navigate to the Projects section and click 'Add New Project'. Fill in the required fields and save.",
    category: "Project",
  },
  {
    question: "Can I collaborate with others?",
    answer:
      "Yes, you can invite team members to your projects via email and manage their permissions.",
    category: "Collaboration",
  },
  {
    question: "Is my data secure?",
    answer:
      "All your data is encrypted and securely stored. We use industry-standard security practices.",
    category: "Security",
  },
];

// Category Colors
const categoryColors = {
  Account: "#4caf50", // Green
  Project: "#2196f3", // Blue
  Collaboration: "#ff9800", // Orange
  Security: "#f44336", // Red
};

const Faq = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaq = faqData.filter((item) =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box m={{ xs: "10px", sm: "20px" }}>
      <Header title="FAQ" subtitle="Frequently Asked Questions" />

      {/* Search Input */}
      <Box
        maxWidth={800}
        width="100%"
        mx="auto"
        mb={3}
        px={{ xs: 1, sm: 2 }}
      >
        <TextField
          fullWidth
          placeholder="Search questions..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.greenAccent?.[400] }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* FAQ Items */}
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth={800}
        width="100%"
        mx="auto"
        px={{ xs: 1, sm: 2 }}
      >
        {filteredFaq.length > 0 ? (
          filteredFaq.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <motion.div
                key={index}
                layout
                initial={{ borderRadius: 10 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  backgroundColor: colors.primary[400] || "#333",
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: `0 4px 12px ${colors.grey[800] || "#000"}33`,
                }}
              >
                {/* Question */}
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  gap={{ xs: 1, sm: 2 }}
                  p={{ xs: 2, sm: 3 }}
                  sx={{ cursor: "pointer" }}
                  onClick={() => toggleIndex(index)}
                >
                  <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: colors.greenAccent?.[400] || "#4caf50",
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                      }}
                    >
                      {item.question}
                    </Typography>

                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        backgroundColor: categoryColors[item.category],
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      }}
                    />
                  </Box>

                  <ExpandMoreIcon
                    sx={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.3s",
                      color: colors.greenAccent?.[400] || "#4caf50",
                      alignSelf: { xs: "flex-end", sm: "center" },
                    }}
                  />
                </Box>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        p={{ xs: 2, sm: 3 }}
                        borderTop={`1px solid ${colors.grey?.[700] || "#555"}`}
                      >
                        <Typography
                          sx={{
                            color: colors.grey?.[100] || "#eee",
                            fontSize: { xs: "0.85rem", sm: "1rem" },
                          }}
                        >
                          {item.answer}
                        </Typography>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        ) : (
          <Typography
            variant="body1"
            color={colors.grey?.[200]}
            textAlign="center"
            mt={4}
          >
            No questions match your search.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Faq;
