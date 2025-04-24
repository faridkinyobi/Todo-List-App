import React from "react";
import TextInput from "./components/TextInput";
import { FiPlus, FiList, FiArchive, FiTrash2, FiCheck } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { addList, deletelist, toggleCompleted } from "./redux/todoSlice";
import { dataList } from "./redux/todoSlice";
import { RootState } from "./redux/story";
import { Toaster, toast } from "react-hot-toast";
import { formatDate } from "./utils/formatdate";
// const data = [
//     {
//         name: "Belajar front end vue",
//         desc: "Membuat dynemic route",
//     },
//     {
//         name: "Belajar React",
//         desc: "Membuat komponen dasar",
//     },
//     {
//         name: "Kerjakan tugas",
//         desc: "Tugas kuliah minggu ini",
//     },
//     {
//         name: "Baca buku",
//         desc: "Chapter 3 - Pemrograman",
//     },
//     {
//         name: "Olahraga",
//         desc: "Jogging 30 menit",
//     },
//     {
//         name: "Meeting Tim",
//         desc: "Diskusi project jam 10",
//     },
//     {
//         name: "Ngoding",
//         desc: "Lanjutin todo app",
//     },
// ];
function App() {
    const dispatch = useDispatch();
    const datas = useSelector((state: RootState) => state.todolist);

    // console.log(filter);
    const [form, setForm] = React.useState<dataList>({
        title: "",
        desc: "",
        completed: false,
    });

    const [view, setView] = React.useState<"list" | "completed">("list");
    const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleAddTodo = () => {
        if (form.title.trim() === "" || form.desc.trim() === "") {
            toast.error("Form tidak boleh kosong!");
            return;
        }
        dispatch(addList({ ...form }));
        toast.success("berhasil menambah data"!);
        setForm({ title: "", desc: " ", completed: false });
    };
    const handleDelete = (items: dataList) => {
        toast.success("berhasil dihapus "!);
        dispatch(deletelist(items));
    };
    const handleCompleted = (items: dataList) => {
        dispatch(toggleCompleted(items));
        setView("completed");
    };
    return (
        <div className="bg-black/90 w-screen h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="max-w-[90%] md:max-w-[50%] mx-auto pt-10 ">
                <div className=" space-y-4 bg-neutral-600 rounded-sm ">
                    <h1 className=" text-center py-4 font-semibold text-2xl text-white ">
                        My Todos List
                    </h1>
                    <div className="flex flex-wrap justify-center items-center space-y-2 md:space-y-0 gap-3 mx-3 md:mx-0 text-white">
                        <TextInput
                            placeholder="Title"
                            name="title"
                            value={form.title}
                            onChange={handleCange}
                        />
                        <TextInput
                            placeholder="description"
                            name="desc"
                            value={form.desc}
                            onChange={handleCange}
                        />
                        <button
                            onClick={handleAddTodo}
                            className="w-full md:w-1/6 py-2 bg-blue-400 rounded-lg focus:outline flex items-center justify-center gap-1.5"
                        >
                            <FiPlus /> add list
                        </button>
                    </div>

                    <div className=" mx-3 md:mx-11 pb-4">
                        <div className="flex py-3 gap-0.5">
                            <button
                                onClick={() => setView("list")}
                                className={`${
                                    view === "list"
                                        ? "bg-green-400"
                                        : "bg-gray-400"
                                } flex items-center justify-center gap-1.5 py-1 px-6 rounded-l-md focus:outline text-white`}
                            >
                                <FiList /> List
                            </button>
                            <button
                                onClick={() => setView("completed")}
                                className={`${
                                    view === "completed"
                                        ? "bg-green-400"
                                        : "bg-gray-400"
                                } flex items-center justify-center gap-1.5 py-1 px-3 rounded-r-md focus:outline text-white`}
                            >
                                <FiArchive /> completed
                            </button>
                        </div>
                        <div className="scrollbar-hide max-h-[30vh] md:max-h-[53vh] overflow-x-auto list-none space-y-2">
                            {view === "list" ? (
                                <>
                                    {datas?.data
                                        ?.filter(
                                            (item) => item.completed === false
                                        )
                                        .map(
                                            (
                                                items: dataList,
                                                index: number
                                            ) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className=" p-3 shadow-sm bg-neutral-300 backdrop-blur-2xl rounded-md flex justify-between items-center"
                                                    >
                                                        <div className=" space-y-1">
                                                            <h3 className="font-semibold text-lg">
                                                                {items.title}
                                                            </h3>
                                                            <p className="text-gray-600 text-xs">
                                                                {items.desc ||
                                                                    "No description."}
                                                            </p>
                                                        </div>
                                                        <div className="flex space-x-3 text-xl cursor-pointer">
                                                            <FiTrash2
                                                                size={24}
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        items
                                                                    )
                                                                }
                                                                className="text-red-500 hover:scale-110 transition-transform"
                                                            />

                                                            <FiCheck
                                                                onClick={() =>
                                                                    handleCompleted(
                                                                        items
                                                                    )
                                                                }
                                                                size={24}
                                                                className="text-red-500 hover:scale-110 transition-transform"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                </>
                            ) : null}
                            {view === "completed" &&
                                datas?.data
                                    .filter((item) => item.completed)
                                    .map((items, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="p-3 shadow-sm bg-neutral-300 backdrop-blur-2xl rounded-md flex justify-between items-center"
                                            >
                                                <div className=" space-y-1">
                                                    <h3 className="font-semibold text-lg">
                                                        {items.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-xs">
                                                        {items.desc ||
                                                            "No description."}
                                                    </p>
                                                    <p>
                                                        Completed at:
                                                        {formatDate(
                                                            items.completedAt ||
                                                                ""
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-3 text-xl cursor-pointer">
                                                    <FiTrash2
                                                        size={24}
                                                        onClick={() =>
                                                            handleDelete(items)
                                                        }
                                                        className="text-red-500 hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
// function addlist(arg0: { completed: boolean; title: string; desc: string; }): any {
//     throw new Error("Function not implemented.");
// }
