import editIcon from "@/assets/icons/table-icons/edit.svg";
import disableIcon from "@/assets/icons/table-icons/disable.svg";
import water from "@/assets/icons/sections-management.svg";

export const SECTIONS_TABLE_CONFIG = {
  columns: [
    {
      title: "ID",
      name: "id",
      sortable: true,
    },
    {
      title: "Alias",
      name: "name",
      sortable: true,
    },
    {
      title: "Coordenadas (WGS84)",
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
  sortBy: "id",
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
      name: "surnames",
      sortable: true,
    },
    {
      title: "Rol",
      name: "roleName",
      sortable: true,
    },
    {
      title: "Cod",
      name: "cod",
      sortable: true,
    },
    { name: "actions", title: "", sortable: false },
  ],
  data: [],
  sortBy: "name",
  actions: [
    { name: "edit", title: "Editar", icon: editIcon },
    { name: "disable", title: "Deshabilitar", icon: disableIcon },
    {
      name: "userRiverSections",
      title: "Gestionar tramos usuario",
      icon: water,
    },
  ],
  allowMultipleSelection: false,
};

export const USER_SECTIONS_TABLE_CONFIG = {
  columns: [
    {
      title: "Expert",
      name: "expert",
      sortable: false,
      isCheckbox: true,
    },
    {
      title: "TEA",
      name: "tea",
      sortable: false,
      isCheckbox: true,
    },
    {
      title: "ID",
      name: "id",
      sortable: true,
    },
    {
      title: "Alias",
      name: "name",
      sortable: true,
    },
    {
      title: "Coordenadas (WGS84)",
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
  ],
  data: [],
  sortBy: "id",
  actions: [],
  allowMultipleSelection: false,
};
