
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";



const Form = () => {
  const theme = useTheme();
  const [successOpen, setSuccessOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  async function onSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Submitting the data", data);
    setSuccessOpen(true);
    reset();
  }

  const MotionBox = motion(Box);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            : "linear-gradient(135deg, #e0f7fa, #ffffff)",
        transition: "all 0.5s ease-in-out",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: "20px",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Create Profile
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "20px" }}>
            {[
              {
                name: "firstName",
                label: "First Name",
                rules: {
                  required: "First name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                },
              },
              {
                name: "lastName",
                label: "Last Name",
                rules: {
                  required: "Last name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                },
              },
              {
                name: "email",
                label: "Email",
                rules: {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                },
              },
              {
                name: "address",
                label: "Address",
                rules: {
                  required: "Address is required",
                  minLength: { value: 5, message: "At least 5 characters" },
                },
              },
              {
                name: "address2",
                label: "Address 2",
                rules: {
                  required: "Address 2 is required",
                  minLength: { value: 5, message: "At least 5 characters" },
                },
              },
            ].map((field, idx) => (
              <MotionBox
                key={idx}
                whileFocus={{ scale: 1.02 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <TextField
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  {...register(field.name, field.rules)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.divider,
                        transition: "all 0.3s ease-in-out",
                      },
                      "&:hover fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#00e5ff" : "#1976d2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor:
                          theme.palette.mode === "dark" ? "#00e5ff" : "#1976d2",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 0 10px #00e5ff"
                            : "0 0 10px #1976d2",
                      },
                    },
                  }}
                />
              </MotionBox>
            ))}

            {/* ✅ Submit Button */}
            <Box display="flex" justifyContent="center" mt={3}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: "30px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    background: isSubmitting
                      ? "linear-gradient(270deg, #1976d2, #42a5f5, #64b5f6)"
                      : undefined,
                    backgroundSize: isSubmitting ? "600% 600%" : undefined,
                    animation: isSubmitting
                      ? "gradientMove 3s ease infinite"
                      : "none",
                    "@keyframes gradientMove": {
                      "0%": { backgroundPosition: "0% 50%" },
                      "50%": { backgroundPosition: "100% 50%" },
                      "100%": { backgroundPosition: "0% 50%" },
                    },
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        style={{
                          border: `3px solid rgba(255,255,255,0.4)`,
                          borderTop: `3px solid ${
                            theme.palette.mode === "dark" ? "white" : "#1976d2"
                          }`,
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                        }}
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </motion.div>
            </Box>
          </form>
        </Paper>
      </motion.div>

      {/* ✅ Modern Notification Style Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        >
          <Alert
            onClose={() => setSuccessOpen(false)}
            severity="success"
            icon={false}
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #11998e, #38ef7d)",
              color: "white",
              boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
              borderRadius: "14px",
              fontSize: "1.05rem",
              px: 2,
              py: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              "&:hover": {
                boxShadow: "0px 8px 24px rgba(0,0,0,0.35)",
                transform: "scale(1.02)",
                transition: "0.3s ease",
              },
            }}
          >
            ✅ Profile Created Successfully!
          </Alert>
        </motion.div>
      </Snackbar>
    </Box>
  );
};

export default Form;
