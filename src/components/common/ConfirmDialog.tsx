import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  close: () => void;
  accept: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  close,
  accept,
}) => {
  return (
    <Dialog open={open} onClose={close}>
      <DialogContent>
        Are you sure you want to delete this property?
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={accept} autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};
