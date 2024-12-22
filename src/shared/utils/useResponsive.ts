import { ref, onMounted, onUnmounted } from 'vue';

export function useResponsive(query) {
  const matches = ref(false);

  const updateMatches = (): void => {
    matches.value = window.matchMedia(query).matches;
  };

  onMounted((): void => {
    updateMatches();
    window.matchMedia(query).addEventListener('change', updateMatches);
  });

  onUnmounted((): void => {
    window.matchMedia(query).removeEventListener('change', updateMatches);
  });

  return matches;
}
