import eventBus from "../../eventBus.ts";
import { useRouter } from "vue-router";
import { reactive, onMounted, onUnmounted, ref } from "vue";
import { useSnackbar } from '../snackbar/snackbar';
import axios from "axios";

export interface Machine {
  id: string;
  machine: string;
}

export default function useNavbar() {
  const router = useRouter();
  const { show: showSnackbar } = useSnackbar();
  const machines = ref<Machine[]>([]);

  const state = reactive({
    isLoggedIn: !!localStorage.getItem("jwtToken"),
    isMenuOpen: false,
  });

  const toggleMenu = () => {
    state.isMenuOpen = !state.isMenuOpen;
  };

  const closeMenu = () => {
    state.isMenuOpen = false;
  };

  const register = () => router.push("/register");
  const login = () => router.push("/login");

  const logout = () => {
    localStorage.clear();
    state.isLoggedIn = false;
    showSnackbar('Logout successful!', 'success');
    router.push({ name: 'Login' });
  };

  const handleAuthAction = () => {
    state.isLoggedIn ? logout() : login();
    closeMenu();
    router.push("/login");
  };

  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
  });

  const fetchMachines = async () => {
    try {
      const response = await axios.get<Machine[]>("machine/getAllMachines", getAuthHeaders());
      machines.value = response.data;
    } catch (err) {
      console.error("Failed to fetch machines", err);
    }
  };  

  const goToAdmin = () => {
    router.push("/admin");
    closeMenu();
  };

  const handleLoginSuccess = () => {
    state.isLoggedIn = true;
    // Fetch machines after login
    fetchMachines();
  };

  onMounted(() => eventBus.on("login-success", handleLoginSuccess));
  onUnmounted(() => eventBus.off("login-success", handleLoginSuccess));

  return {
    state,
    machines,
    toggleMenu,
    closeMenu,
    handleAuthAction,
    register,
    goToAdmin,
  };
}
