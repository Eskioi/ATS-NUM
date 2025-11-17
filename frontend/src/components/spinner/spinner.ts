import { ref } from 'vue';

const visible = ref(false);

export default function useSpinner() {
  const show = () => {
    visible.value = true;
  };

  const hide = () => {
    visible.value = false;
  };

  return {
    visible,
    show,
    hide
  };
}
