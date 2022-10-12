import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import InputAdornment from "@mui/material/InputAdornment";
import EuroIcon from "@mui/icons-material/Euro";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { useProject } from "./use-project";
import { MembersField } from "./MembersField";

export const RegisterExpense = () => {
  const { error, categories, members } = useProject();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = {
      amount: form.getAll("amount").shift(),
      category: form.getAll("category").shift(),
      notes: form.getAll("notes").shift(),
      reporter: form.getAll("reporter").shift(),
      date: form.getAll("date").shift()
    };

    console.log(formData);
  };

  if (error) {
    return (
      <Box>
        <Alert severity="error">{error.message}</Alert>
        <Box sx={{ m: 2 }}>
          <Button variant="contained" fullWidth component={Link} to="/">
            ok
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ backgroundColor: "#ddd", pt: 0.01, pb: 0.01 }}
    >
      <Stack sx={{ m: 2 }} spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Amount
          </Typography>
          <TextField
            fullWidth
            name="amount"
            placeholder="0.00"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EuroIcon />
                </InputAdornment>
              ),
              inputProps: {
                type: "number",
                inputMode: "decimal",
                pattern: "[0-9]*",
                style: { paddingLeft: 10 }
              }
            }}
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Category
          </Typography>
          <RadioGroup name="category">
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.id}
                value={cat.id}
                control={<Radio />}
                label={cat.title}
              />
            ))}
          </RadioGroup>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Notes
          </Typography>
          <TextField multiline fullWidth name="notes" rows={4} />
        </Paper>

        <MembersField members={members} />

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            When
          </Typography>
          <TextField
            fullWidth
            name="date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
          />
        </Paper>
      </Stack>

      <Toolbar variant="dense" />
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, background: "white" }}
      >
        <Toolbar variant="dense">
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
