import { useForm } from "react-hook-form";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="container-fluid contact">
      <div className="container contact-cont mx-auto my-8 w-[768px]">
        <h2 className="text-center font-bold text-3xl py-7">Contact Us</h2>

        <form className="border border-zinc-100 p-5 rounded-md" onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input className="input input-bordered w-full mb-3" type="text" placeholder="Full Name" {...register("full_name")} />
          <input className="input input-bordered w-full mb-3" type="email" placeholder="Email" {...register("email")} />
          <textarea className="input input-bordered w-full mb-3 h-24" rows="10" placeholder="Message" {...register("message")}></textarea>

          <input className="input input-bordered w-full mb-3 bg-slate-500 hover:opacity-85 text-slate-200 cursor-pointer" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
