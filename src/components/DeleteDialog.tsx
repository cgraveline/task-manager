import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import type { Task } from '../types'

interface DeleteDialogProps {
  task: Task | null
  open: boolean
  onClose: () => void
  onConfirm: (task: Task) => void
}

export function DeleteDialog({ task, open, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DeleteForeverRoundedIcon color="error" />
          <Typography variant="h6">Delete Task?</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {task ? `This removes “${task.title}” from the board. This cannot be undone.` : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            if (task) {
              onConfirm(task)
            }
          }}
        >
          Delete Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}
