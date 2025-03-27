import { getLogedUserData, logOutUser } from "@/api/auth/useAuth";
import { DonationForm, getDonations, updateDonation } from "@/api/useDonations";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [donations, setDonations] = useState<DonationForm[]>([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getLogedUserData();
      if (!currentUser.user) {
        navigate("/admin");
      } else {
        setUser(currentUser.user);
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch Donations Data
  const fetchDonations = async () => {
    setLoading(true);

    try {
      const donations = await getDonations();
      setDonations(donations);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  // Approval change
  const toggleApproval = async (id: string, isApproved: boolean) => {
    try {
      await updateDonation(id, "is_approved", !isApproved);
      await fetchDonations();
    } catch (error) {
      alert(error.message);
    }
  };

  // handle logout
  const handleLogout = async () => {
    try {
      await logOutUser();
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex items-center gap-2">
          {user?.email}
          <button
            onClick={handleLogout}
            className="bg-ftpurple py-2 px-6 rounded-full  hover:bg-ftpurple-dark text-white py-2 transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-4">Donations</h2>
        {loading ? (
          <p>Loading donations...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Approved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>{donation.email}</TableCell>
                  <TableCell>${donation.amount}</TableCell>
                  <TableCell>{donation.type}</TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        toggleApproval(donation.id, donation.is_approved)
                      }
                      className={`py-2 px-6 rounded-full transition ${
                        donation.is_approved
                          ? "bg-ftpurple text-white hover:bg-ftpurple-dark"
                          : "border-2 border-purple-600 text-purple-600 hover:bg-purple-100"
                      }`}
                    >
                      {donation.is_approved ? "Approved" : "Pending"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
