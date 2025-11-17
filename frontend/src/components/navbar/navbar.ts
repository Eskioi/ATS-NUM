import eventBus from "../../eventBus.ts";
import { useRouter } from "vue-router";
import { reactive, onMounted, onUnmounted } from "vue";
import { useSnackbar } from '../snackbar/snackbar'

export default function useNavbar() {
  const router = useRouter();
  const { show: showSnackbar } = useSnackbar()

  const state = reactive({
    isLoggedIn: !!localStorage.getItem("jwtToken"),
    isMenuOpen: false,
  });

  const handleLoginSuccess = () => {
    state.isLoggedIn = true;
  };

  const toggleMenu = () => {
    state.isMenuOpen = !state.isMenuOpen;
  };

  const closeMenu = () => {
    state.isMenuOpen = false;
  };

  const handleAuthAction = () => {
    state.isLoggedIn ? logout() : login();
    closeMenu();
    router.push("/login");
  };

  const register = () => {
    router.push("/register");
  };

  const login = () => {
    router.push("/login");
  };

  const logout = () => {
    localStorage.clear();
    state.isLoggedIn = false;
    showSnackbar('Logout successful!', 'success')
    router.push({ name: 'Home' });
  };

  onMounted(() => eventBus.on("login-success", handleLoginSuccess));
  onUnmounted(() => eventBus.off("login-success", handleLoginSuccess));

  return { state, toggleMenu, closeMenu, handleAuthAction, register };
}
