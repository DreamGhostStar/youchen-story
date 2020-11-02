import { useEffect } from 'react';
function useClickOutSide(ref, handler) {
    useEffect(function () {
        var lisener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', lisener);
        return function () {
            document.removeEventListener('click', lisener);
        };
    }, [ref, handler]);
}
export default useClickOutSide;
