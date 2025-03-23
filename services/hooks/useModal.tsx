import { useBottomModalStore } from "@/store/bottomModalStore";

export const useModal = () => {
    const { modalContent, setModalContent } = useBottomModalStore();

    const showBottomModal = (content: React.ReactNode) => {
        setModalContent(content);
    }

    const hideBottomModal = () => {
        setModalContent(null);
    }

    return { showBottomModal, hideBottomModal };
};
