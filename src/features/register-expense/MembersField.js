import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export const MembersField = ({ members }) => {
  const [value, setValue] = useState(null);

  // Pre-select with the owner:
  useEffect(() => {
    if (!members.length) {
      return;
    }

    const owner = members.find(($) => $.isOwner);
    setValue(owner.id);
  }, [members]);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reported by
      </Typography>
      <RadioGroup name="reporter">
        {members.map((member) => (
          <FormControlLabel
            key={member.id}
            value={member.id}
            control={<Radio />}
            label={<p>{member.displayName}</p>}
            checked={member.id === value}
          />
        ))}
      </RadioGroup>
    </Paper>
  );
};
