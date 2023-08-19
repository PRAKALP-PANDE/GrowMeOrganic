import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

interface DepartmentComponentProps {
  data: Department[];
}

const DepartmentComponent: React.FC<DepartmentComponentProps> = ({ data }) => {
  const [openDepartments, setOpenDepartments] = useState<number[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleDepartmentClick = (departmentId: number) => {
    if (openDepartments.includes(departmentId)) {
      setOpenDepartments(openDepartments.filter(id => id !== departmentId));
    } else {
      setOpenDepartments([...openDepartments, departmentId]);
    }
  };

  const handleItemToggle = (itemId: number) => () => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter(id => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const isDepartmentOpen = (departmentId: number) => openDepartments.includes(departmentId);
  const isItemSelected = (itemId: number) => selectedItems.includes(itemId);

  // const handleDepartmentSelection = (departmentId: number, subDepartmentIds: number[]) => () => {
  //   setSelectedItems((prevSelectedItems) => {
  //     const newSelectedItems = new Set<number>(prevSelectedItems);
  //     subDepartmentIds.forEach(id => {
  //       if (!prevSelectedItems.includes(id)) {
  //         newSelectedItems.add(id);
  //       }
  //     });

  //     if (subDepartmentIds.every(id => prevSelectedItems.includes(id))) {
  //       subDepartmentIds.forEach(id => newSelectedItems.delete(id));
  //     } else {
  //       newSelectedItems.add(departmentId);
  //     }

  //     return Array.from(newSelectedItems);
  //   });
  // };

  const handleAllSubDepartmentsSelection = (departmentId: number, subDepartmentIds: number[]) => () => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      subDepartmentIds.forEach(id => {
        if (!prevSelectedItems.includes(id)) {
          newSelectedItems.add(id);
        }
      });

      if (subDepartmentIds.every(id => prevSelectedItems.includes(id))) {
        subDepartmentIds.forEach(id => newSelectedItems.delete(id));
      } else {
        newSelectedItems.add(departmentId);
      }
      
      return Array.from(newSelectedItems);
    });
  };

  return (
    <List style={{width:"300px"}}>
      {data.map((department) => (
        <div key={department.id}>
          <ListItem button onClick={() => handleDepartmentClick(department.id)}>
            <ListItemIcon>
              {isDepartmentOpen(department.id) ? <ExpandLess /> : <ExpandMore />}
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <Checkbox
              edge="end"
              checked={department.subDepartments.every(subDept => isItemSelected(subDept.id))}
              tabIndex={-1}
              disableRipple
              onClick={(e) => e.stopPropagation()}
              onChange={handleAllSubDepartmentsSelection(
                department.id,
                department.subDepartments.map(subDept => subDept.id)
              )}
            />
          </ListItem>
          <Collapse in={isDepartmentOpen(department.id)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDept) => (
                <ListItem key={subDept.id} button>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isItemSelected(subDept.id)}
                      tabIndex={-1}
                      disableRipple
                      onClick={handleItemToggle(subDept.id)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept.name} style={{cursor: "default"}} />
                </ListItem>
              ))}
              {/* <ListItem>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={department.subDepartments.every(subDept => isItemSelected(subDept.id))}
                    tabIndex={-1}
                    disableRipple
                    onClick={(e) => e.stopPropagation()}
                    onChange={handleAllSubDepartmentsSelection(
                      department.id,
                      department.subDepartments.map(subDept => subDept.id)
                    )}
                  />
                </ListItemIcon>
                <ListItemText primary="Select All Sub-departments" />
              </ListItem> */}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentComponent;
