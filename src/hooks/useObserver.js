import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callBack) => {
    const observer = useRef()
    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect()
        var callback = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad){
                callBack()
                console.log(entries)
            }
        };
        observer.current = new IntersectionObserver(callback)
        observer.current.observe(ref.current)
    }, [isLoading])
}
