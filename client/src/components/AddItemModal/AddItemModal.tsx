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
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/joy";
import { ShoppingItem } from "@/types";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string()
    .max(100, "Máximo 100 caracteres")
    .required("La descripción es requerida"),
  quantity: Yup.string().required("Por favor selecciona una cantidad"),
});

const initialValues: ShoppingItem = {
  name: "",
  description: "",
  quantity: "",
};

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
}

const AddItemModal = ({ open, onClose }: AddItemModalProps) => {
  const handleSubmit = (
    values: ShoppingItem,
    { setSubmitting }: FormikHelpers<ShoppingItem>
  ) => {
    console.log(values);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Completa el formulario</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}
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
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <FormControl
                fullWidth
                margin="dense"
                error={touched.quantity && Boolean(errors.quantity)}
              >
                <InputLabel>How many?</InputLabel>
                <Select
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="How many?"
                >
                  <MenuItem value="">
                    <em>How many?</em>
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
                {touched.quantity && errors.quantity && (
                  <Typography
                    level="body-xs"
                    sx={{ fontSize: "12px", color: "danger", mt: 0.5 }}
                  >
                    {errors.quantity}
                  </Typography>
                )}
              </FormControl>

              <Textarea
                placeholder="Descripción"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                name="description"
                minRows={2}
                maxRows={4}
                sx={{
                  borderColor:
                    touched.description && Boolean(errors.description)
                      ? "red"
                      : "",
                  borderWidth:
                    touched.description && Boolean(errors.description)
                      ? "1px"
                      : "",
                  borderStyle:
                    touched.description && Boolean(errors.description)
                      ? "solid"
                      : "",
                }}
                endDecorator={
                  <Typography level="body-xs" sx={{ ml: "auto" }}>
                    {values.description.length}/100
                  </Typography>
                }
              />
              {touched.description && errors.description && (
                <Typography
                  level="body-xs"
                  sx={{ fontSize: "12px", color: "danger", mt: 0.5 }}
                >
                  {errors.description}
                </Typography>
              )}

              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Enviar
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
