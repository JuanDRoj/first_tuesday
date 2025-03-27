import { useForm } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { addDonation, DonationForm } from "@/api/useDonations";
import { useNavigate } from "react-router-dom";

const DonationPopUp = ({
  onClose,
  defaultAmount = 0,
}: {
  onClose: () => void;
  defaultAmount?: number;
}) => {
  const navigate = useNavigate();

  const form = useForm<DonationForm>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      amount: defaultAmount,
      type: "public",
    },
  });

  const onSubmit = async (data: DonationForm) => {
    try {
      await addDonation(data);
      navigate("/thank-you");
    } catch (error) {
      alert(error.message);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      className="border p-2 rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },

                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="tel"
                      className={"border p-2 rounded w-full"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      {...field}
                      className="border p-2 rounded w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              rules={{
                required: "Donation amount is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Only valid numbers (e.g., 10 or 10.50) are allowed",
                },
                min: {
                  value: 0.01,
                  message: "Donation must be greater than $0",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Amount </FormLabel>

                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <FormControl>
                      <input
                        {...field}
                        disabled={defaultAmount > 0}
                        autoComplete="false"
                        type="number"
                        inputMode="decimal"
                        className="border p-2 pl-7 rounded w-full"
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              defaultValue="public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Type</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="single"
                      onValueChange={(value) =>
                        field.onChange(value || "public")
                      }
                      value={field.value}
                      className="flex w-full  gap-2 border rounded-lg p-1"
                    >
                      <ToggleGroupItem
                        value="public"
                        className={cn(
                          "w-full px-4 py-2 rounded-md transition-all",
                          field.value === "public"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        Public
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="private"
                        className={cn(
                          "w-full px-4 py-2 rounded-md transition-all",
                          field.value === "private"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        Private
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full bg-ftpurple py-2 px-6 rounded-full  hover:bg-ftpurple-dark text-white py-2 transition"
            >
              Submit
            </button>
          </form>
        </Form>
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-full py-2 px-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DonationPopUp;
