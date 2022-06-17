import SortIcon from "@mui/icons-material/Sort";
import { InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FSelect } from "../components/form";

export const SORT_BY_OPTIONS = [
  { value: "", label: "Sort" },
  { value: "createdAt.desc", label: "Newest" },
  { value: "name.asc", label: "Title: A-Z" },
  { value: "name.desc", label: "Title: Z-A" },
//   { value: "discount.desc", label: "Sale: High-Low" },
//   { value: "discount.asc", label: "Sale: Low-High" },
{ value: "price.desc", label: "Price: High-Low" },
  { value: "price.asc", label: "Price: Low-High" },
];

const defaultValues = {
  sortBy: "",
};
export default function ProductsSort({ handleSort }) {
  const methods = useForm({ defaultValues, mode: "onChange" });
  const { handleSubmit, watch } = methods;

  useEffect(() => {
    const subscription = watch((value) => handleSort(value));
    return () => subscription.unsubscribe();
  }, [watch, handleSort]);

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FSelect
        name="sortBy"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SortIcon />
            </InputAdornment>
          ),
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FSelect>
    </FormProvider>
  );
}
