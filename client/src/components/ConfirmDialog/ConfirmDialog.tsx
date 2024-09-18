import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ p: 4 }}>
        <Typography variant="h2" align="left">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 4 }}>
        <DialogContentText>
          <Typography variant="h2" align="left">
            {description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 4 }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
