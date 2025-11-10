import eventBus from "@/eventBus.ts";
import { useRouter } from "vue-router";
import { reactive, onMounted, onUnmounted } from "vue";

export default function useNavbar() {
  const router = useRouter();

  const state = reactive({
    isLoggedIn: !!localStorage.getItem("authKey"),
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
    router.push({ name: 'Home' });
  };

  onMounted(() => eventBus.on("login-success", handleLoginSuccess));
  onUnmounted(() => eventBus.off("login-success", handleLoginSuccess));

  return { state, toggleMenu, closeMenu, handleAuthAction, register };
}
