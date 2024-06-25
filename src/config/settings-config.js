import editIcon from "@/assets/icons/table-icons/edit.svg";

export const SECTIONS_TABLE_CONFIG = {
  columns: [
    {
      title: "Alias",
      name: "name",
      sortable: true,
    },
    {
      title: "Coordenadas",
      name: "coords",
      sortable: true,
    },
    {
      title: "Municipio",
      name: "municipality",
      sortable: true,
    },
    {
      title: "Río",
      name: "river",
      sortable: true,
    },
    { name: "actions", title: "", sortable: false },
  ],
  data: [],
  sortBy: "name",
  actions: [{ name: "edit", title: "Editar", icon: editIcon }],
  allowMultipleSelection: false,
};

export const USERS_TABLE_CONFIG = {
  columns: [
    {
      title: "Nombre",
      name: "name",
      sortable: true,
    },
    {
      title: "Apellidos",
      name: "surname",
      sortable: true,
    },
    {
      title: "Rol",
      name: "roleId",
      sortable: true,
    },
    { name: "actions", title: "", sortable: false },
  ],
  data: [],
  sortBy: "name",
  actions: [{ name: "edit", title: "Editar", icon: editIcon }],
  allowMultipleSelection: false,
};
