import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Search.css";
export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setSearchParams(q ? { q } : {}), 1000);
    return () => clearTimeout(timeout);
  }, [q]);

  useEffect(()=>{
    setQ(searchParams.get("q") || "" )
  },[searchParams])

  return (
    <div className="search">
      <input
      className="form-control"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="text"
        placeholder="فیلتر مخاطبین"
      />
    </div>
  );
}
