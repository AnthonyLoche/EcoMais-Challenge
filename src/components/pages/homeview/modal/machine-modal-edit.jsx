import { useState } from "react";
import { MapPin, FileText, Tag } from "lucide-react";
import { toast } from "sonner";
import { useMachines } from "../../../../hooks";

export default function MachineModalEdit({ machine, onSave }) {
  const { updateMachine } = useMachines();

  const [form, setForm] = useState({
    nome: machine?.codigo ?? "",
    descricao: machine?.descricao ?? "",
    local: machine?.local ?? "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.nome.trim()) {
      toast.error("O campo Nome é obrigatório.");
      return;
    }

    if (!form.local.trim()) {
      toast.error("O campo Local é obrigatório.");
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim(),
      local: form.local.trim(),
    };

    const result = await updateMachine(machine.id, payload);

    console.log("Updated machine:", result);

    if (!result) {
      toast.error("Erro inesperado.");
      return;
    }

    if (result.status) {
      toast.success("Máquina atualizada com sucesso!");
      onSave?.({
        codigo: payload.nome,
        descricao: payload.descricao,
        local: payload.local,
      });
    } else {
      toast.success("Dados alterados localmente!");
      onSave?.({
        codigo: payload.nome,
        descricao: payload.descricao,
        local: payload.local,
      });
      console.warn("Falha ao atualizar máquina");
    }
  };

  const fields = [
    {
      key: "nome",
      label: "Nome",
      icon: <Tag size={15} className="text-green-500" />,
      bg: "bg-green-50",
      placeholder: "Ex: Compressor A1",
      multiline: false,
    },
    {
      key: "descricao",
      label: "Descrição",
      icon: <FileText size={15} className="text-blue-500" />,
      bg: "bg-blue-50",
      placeholder: "Descreva a máquina...",
      multiline: true,
    },
    {
      key: "local",
      label: "Local",
      icon: <MapPin size={15} className="text-orange-500" />,
      bg: "bg-orange-50",
      placeholder: "Ex: Galpão 2 - Setor B",
      multiline: false,
    },
  ];

  return (
    <div className="flex flex-col gap-3 h-full">
      {fields.map(({ key, label, icon, bg, placeholder, multiline }) => (
        <div
          key={key}
          className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-1.5 rounded-lg ${bg}`}>{icon}</div>
            <h3 className="text-sm font-semibold text-gray-700">{label}</h3>
          </div>

          {multiline ? (
            <textarea
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              rows={2}
              className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200
                         rounded-lg px-3 py-2 resize-none outline-none
                         focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
            />
          ) : (
            <input
              type="text"
              value={form[key]}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full text-sm text-gray-700 placeholder-gray-300 border border-gray-200
                         rounded-lg px-3 py-2 outline-none
                         focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-auto w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600
                   text-white text-sm font-semibold tracking-wide transition-colors shadow-sm"
      >
        Salvar alterações
      </button>
    </div>
  );
}
