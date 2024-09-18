import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Typography,
} from "@mui/material";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ShoppingItem } from "@/types";
import { CloseOutlined } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  description: Yup.string()
    .max(100, "Maximum 100 characters")
    .required("Description is required"),
  quantity: Yup.string().required("Please select a quantity"),
});

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  currentItem?: ShoppingItem | null;
  onSubmit: (item: ShoppingItem) => void;
}

const quantityOptions = [1, 2, 3];

const AddItemModal = ({
  open,
  onClose,
  currentItem,
  onSubmit,
}: AddItemModalProps) => {
  const isEditing = Boolean(currentItem);

  const handleSubmit = (
    values: ShoppingItem,
    { setSubmitting }: FormikHelpers<ShoppingItem>
  ) => {
    onSubmit(values);
    setSubmitting(false);
    onClose();
  };

  const initialValues: ShoppingItem = currentItem || {
    name: "",
    description: "",
    quantity: "",
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h3" color="#5C6269">
          SHOPPING LIST
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h3">
            {isEditing ? "Edit an Item" : "Add an Item"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {isEditing ? "Edit your item below" : "Add your new item below"}
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  minWidth: "500px",
                }}
              >
                <TextField
                  margin="dense"
                  name="name"
                  label="Nombre"
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  margin="dense"
                  name="description"
                  label="Descripción"
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />

                <FormControl
                  fullWidth
                  margin="dense"
                  error={touched.quantity && Boolean(errors.quantity)}
                >
                  <InputLabel id="quantity-label">Cantidad</InputLabel>
                  <Select
                    labelId="quantity-label"
                    id="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Cantidad"
                  >
                    {quantityOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.quantity && errors.quantity && (
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "12px", color: "red", mt: 0.5 }}
                    >
                      {errors.quantity}
                    </Typography>
                  )}
                </FormControl>
              </Box>
              <DialogActions sx={{ mt: 20 }}>
                <Button
                  onClick={onClose}
                  color="inherit"
                  variant="text"
                  sx={{ textTransform: "none" }}
                >
                  <Typography variant="body1">Cancelar</Typography>
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ textTransform: "none" }}
                >
                  <Typography variant="body1" color="#ffff">
                    {isEditing ? "Actualizar" : "Enviar"}
                  </Typography>
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;
